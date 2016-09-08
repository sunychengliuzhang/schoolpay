package com.ai.school.action;

import com.ai.school.util.GeneratePayMsg;
import com.ai.vo.StudentFeeMsg;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Random;

/**
 * Created by chengzheng on 16/9/7.
 * 交学费相关信息
 */
@Controller
public class SchoolPayAction {

    private static final List<String> schools = Lists.newArrayList("亚信大学","百度大学","阿里大学","腾讯大学");

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
        StudentFeeMsg feeMsg = new StudentFeeMsg();
        feeMsg.setAmount(1);
        feeMsg.setFeeRemark("IT培训费用   java:0.5元,C++:0.5元");
        return feeMsg.toString();
    }
    
    
    @RequestMapping(value = "tuitionInfo")
    @ResponseBody
    public ModelAndView tuitionInfo(HttpServletRequest request){
    	String stuNo = request.getParameter("stuNo");
    	String feeAmount = request.getParameter("feeAmount");
    	String feeRemark = request.getParameter("feeRemark");
    	String schoolName = request.getParameter("schoolName");
    	
    	ModelAndView mView = new ModelAndView();
    	mView.setViewName("tuitionay");
    	mView.addObject("styNo", stuNo);
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
        Long orderCode = new Random().nextLong();
        return new GeneratePayMsg().generateJftPayPacket(orderCode);
    }





//    public static void main(String[] args) throws IOException {
//        String file = WeixinPayAction.class.getClassLoader().getResource("school-fee.txt").getFile();
//        File file1 = new File(file);
//        System.out.println(file1);
//        BufferedReader reader = new BufferedReader(new FileReader(file1));
//        List<String> schools = Lists.newArrayList();
//        String line = null;
//        while ((line = reader.readLine()) != null){
//            Iterable<String> splitter = Splitter.on('-').trimResults().omitEmptyStrings().split(line);
//            Iterator<String> iterator = splitter.iterator();
//            String name = iterator.next();
//            String schoolName = iterator.next();
//            String stuNo = iterator.next();
//            System.out.println(name+","+schoolName+","+stuNo);
//
//        }




//        System.out.println(resource);
//        File file = new File("web/school-fee.txt");
//        if(!file.exists()){
//            file.createNewFile();
//        }else{
//            System.out.println("存在");
//        }
//    }

}
