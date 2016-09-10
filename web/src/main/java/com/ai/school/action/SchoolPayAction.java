package com.ai.school.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.MultiThreadedHttpConnectionManager;
import org.apache.commons.httpclient.params.HttpConnectionManagerParams;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.httpclient.protocol.Protocol;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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
        
        request.getSession().setAttribute("feeMsg", feeMsg);
        return feeMsg.toString();
    }
    
    
    @RequestMapping(value = "tuitionInfo")
    @ResponseBody
    public ModelAndView tuitionInfo(HttpServletRequest request){
    	ModelAndView mView = new ModelAndView();
    	mView.setViewName("tuitionPay");
    	StudentFeeMsg feeMsg = (StudentFeeMsg) request.getSession().getAttribute("feeMsg");
    	if (MatchUtil.isEmpty(feeMsg)) {
    		mView.setViewName("tuitionQuery");
	    	mView.addObject("schools", schools);
			return mView;
		}
    	
    	mView.addObject("stuNo", feeMsg.getStuNo());
    	mView.addObject("feeAmount", feeMsg.getAmount());
    	mView.addObject("feeRemark", feeMsg.getFeeRemark());
    	mView.addObject("schoolName", feeMsg.getSchoolName());
    	return mView;
    }

    /**
     * 生成支付报文
     */
    @RequestMapping(value = "generateJftPayPacket",produces = { "application/json;charset=UTF-8" })
    @ResponseBody
    public String generateJftPayPacket(HttpServletRequest request) throws Exception {
    	
        JSONObject jsonObject = new JSONObject();
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
        JSONObject jsonObject = null;
        if (response.getStatusLine().getStatusCode() == 200) {//如果状态码为200,就是正常返回
            result = EntityUtils.toString(response.getEntity());
        }
        return result;
    }
    
    
    @RequestMapping(value = "tuitionResult", produces = { "text/html;charset=UTF-8" })
    @ResponseBody
    public ModelAndView tuitionResult(HttpServletRequest request){
    	ModelAndView mView = new ModelAndView();
		String tradeId = request.getParameter("tradeId");
		String returnCode = request.getParameter("resultCode");
		String billMsg = request.getParameter("billMsg");
		String chargeAmountName = request.getParameter("chargeAmountName");

		mView.addObject("orderId",tradeId);
		mView.addObject("billMsg", billMsg);
		mView.addObject("chargeAmountName", chargeAmountName);
		
		StudentFeeMsg feeMsg = (StudentFeeMsg)request.getSession().getAttribute("feeMsg");
		if (!MatchUtil.isEmpty(feeMsg)) {
			mView.addObject("school", feeMsg.getSchoolName());
			mView.addObject("stuNo",feeMsg.getStuNo());
		}
		
		mView.setViewName("tuitionResult");
		mView.addObject("returnCode", returnCode);
		if("0010".equals(returnCode)){
			mView.setViewName("tuitionInfo");
			mView.addObject("errorMsg","支付取消");
		}
        else if ("009".equals(returnCode)) {// 支付失败
			mView.addObject("errorMsg","支付失败");
		} else if ("00".equals(returnCode)) { // 支付成功
			mView.addObject("errorMsg","支付成功");
		} else if ("01".equals(returnCode)){ //验签失败（对于11通道）
			mView.addObject("errorMsg","支付失败");
		}
    	return mView;
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
