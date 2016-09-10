package com.ai.school.action;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import com.ai.school.util.MatchUtil;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.MultiThreadedHttpConnectionManager;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpConnectionManagerParams;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.httpclient.protocol.Protocol;
import org.apache.http.protocol.HTTP;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ai.school.util.GeneratePayMsg;
import com.ai.vo.StudentFeeMsg;
import com.google.common.collect.Lists;
import com.ai.paas.client.PaasContextHolder;
import com.ai.paas.client.http.HttpClientManager;
import com.ai.school.util.GeneratePayMsg;
import com.ai.school.util.MatchUtil;
import com.ai.school.util.MySecureProtocolSocketFactory;
import com.ai.vo.StudentFeeMsg;
import com.google.common.collect.Lists;


/**
 * Created by chengzheng on 16/9/7.
 * 交学费相关信息
 */
@Controller
public class SchoolPayAction {

    private static final List<String> schools = Lists.newArrayList("西点军校","加利福尼亚大学","哈佛大学","黄埔军校","清华大学","北京大学");
    public static final String HTTP_PAY_URL = "http://121.31.32.100:8099/aipay_web/wxPay.do";

    /**
     * 返回所有的学校
     * @param request
     * @return
     */
    @RequestMapping(value = "weixinpay",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public ModelAndView weixinPay(HttpServletRequest request){
    	ModelAndView mView = new ModelAndView();
    	mView.setViewName("tuitionQuery");
    	mView.addObject("schools", schools);
        return mView;
    }

    /**
     * 查询学费接口
     * @param request
     * @return
     */
    @RequestMapping(value = "getStuFee",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public String stuFee(HttpServletRequest request){
    	String stuNo = request.getParameter("stuNo");
    	String schoolName = request.getParameter("schoolName");
        StudentFeeMsg feeMsg = new StudentFeeMsg();
        feeMsg.setStuNo(stuNo);
        feeMsg.setSchoolName(schoolName);
        feeMsg.setAmount(1);
        feeMsg.setFeeRemark("IT培训费用   java:0.5元,C++:0.5元");
        return feeMsg.toString();
    }
    
    
    @RequestMapping(value = "tuitionInfo")
    @ResponseBody
    public ModelAndView tuitionInfo(HttpServletRequest request){
    	String stuNo = request.getParameter("stuNo");
    	String feeAmount = request.getParameter("amount");
    	String feeRemark = request.getParameter("feeRemark");
    	String schoolName = request.getParameter("schoolName");
    	
    	ModelAndView mView = new ModelAndView();
    	mView.setViewName("tuitionPay");
    	if (MatchUtil.isEmpty(stuNo)|| MatchUtil.isEmpty(feeAmount)||MatchUtil.isEmpty(feeRemark)||MatchUtil.isEmpty(schoolName)) {
			mView.setViewName("tuitionQuery");
	    	mView.addObject("schools", schools);
			return mView;
		}
    	
    	mView.addObject("stuNo", stuNo);
    	mView.addObject("feeAmount", feeAmount);
    	mView.addObject("feeRemark", feeRemark);
    	mView.addObject("schoolName", schoolName);
    	return mView;
    }

    /**
     * 生成支付报文
     */
    @RequestMapping(value = "generateJftPayPacket",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public String generateJftPayPacket(HttpServletRequest request) throws Exception {
    	
        net.sf.json.JSONObject jsonObject = new net.sf.json.JSONObject();
        Long orderCode = new Random().nextLong();
        GeneratePayMsg generatePayMsg  = new GeneratePayMsg();
        String signMsg = generatePayMsg.generateJftPayPacket(orderCode);

        String jsonStr = launchPay(signMsg, "小学");

        if (MatchUtil.isEmpty(jsonStr)) {
			jsonObject.put("success", "faile");
			jsonObject.put("errorMsg", "获取支付报文失败");
			return jsonObject.toString();
		}
        return  jsonStr;
    }

    //获取httpClient对象
    private HttpClient getHttpClient(){
    	MultiThreadedHttpConnectionManager httpConnectionManager = new MultiThreadedHttpConnectionManager();
		HttpConnectionManagerParams params = httpConnectionManager.getParams();
        params.setConnectionTimeout(5000); 
        params.setSoTimeout(18000); 
        params.setDefaultMaxConnectionsPerHost(30); 
        params.setMaxTotalConnections(30); 
        params.setStaleCheckingEnabled(true);
        HttpClient httpClient = new HttpClient(httpConnectionManager);
		httpClient.getParams().setParameter(
				HttpMethodParams.HTTP_CONTENT_CHARSET, "GBK");
		httpClient.getParams().setParameter(HTTP.CONTENT_ENCODING, "GBK");
		httpClient.getParams().setParameter(HTTP.CHARSET_PARAM, "GBK");
		httpClient.getParams().setParameter(HTTP.DEFAULT_PROTOCOL_CHARSET,"GBK");
		
		return httpClient;
    }


    public String launchPay(String requestPacket,String billMsg) throws Exception {
        HttpPost post = new HttpPost(HTTP_PAY_URL);
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("requestPacket", requestPacket));
        params.add(new BasicNameValuePair("billMsg",billMsg));
        post.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));
        HttpResponse response = new DefaultHttpClient().execute(post);
        String result = null;
        org.json.JSONObject jsonObject = null;
        if (response.getStatusLine().getStatusCode() == 200) {//如果状态码为200,就是正常返回
            result = EntityUtils.toString(response.getEntity());
        }
        return result;
    }
    public static void main(String[] args) throws Exception {
//        HttpPost post = new HttpPost(HTTP_PAY_URL);
//        HttpServletRequest request = null;
//        String requestPacket = new SchoolPayAction().generateJftPayPacket(request);
//        List<NameValuePair> params = new ArrayList<NameValuePair>();
//        params.add(new BasicNameValuePair("requestPacket", requestPacket));
////        String billMsg = request.getParameter("billMsg");
//        params.add(new BasicNameValuePair("billMsg","小学"));
//        post.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));
//        HttpResponse response = new DefaultHttpClient().execute(post);
//        String result = null;
//        org.json.JSONObject jsonObject = null;
//        if (response.getStatusLine().getStatusCode() == 200) {//如果状态码为200,就是正常返回
//            result = EntityUtils.toString(response.getEntity());
//            jsonObject = new org.json.JSONObject(result);
//            System.out.println(jsonObject);
//        }
    }
}
