package com.ai.school.util;


import java.io.IOException;

public class WechatProcess {
    private static final String SCHOOL_FEE = "学费";
    private static final String PIC_URL = "http://cdn.sinacloud.net/image-001/image_school.jpg?KID=sina,19ibknuxtSIouwijakMo&Expires=1473347893&ssig=C3fzsX0mJ%2B";
    private static final String URL = "http://sunnypay.applinzi.com/weixinpay";
    /**
     * 解析处理xml、获取智能回复结果（通过图灵机器人api接口）
     *
     * @param xml 接收到的微信数据
     * @return 最终的解析结果（xml格式数据）
     */
    public String processWechatMag(String xml) throws IOException {
        /** 解析xml数据 */
        ReceiveXmlEntity xmlEntity = new ReceiveXmlProcess().getMsgEntity(xml);
        String result = "";
        if ("text".endsWith(xmlEntity.getMsgType())) {
            String content = xmlEntity.getContent();
            System.out.println("----接受到文本消息:"+content);
            if(content.contains(SCHOOL_FEE)){
                //文本消息包含缴费
                result = new FormatXmlProcess().formatImageTextXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), PIC_URL, URL);
                System.out.println(content+"--->交学费:"+result);

            }else {
                //接收到的是文本消息,调用图灵机器人模块进行处理
                result = new TulingApiProcess().getTulingResult(xmlEntity.getContent());
                result = new FormatXmlProcess().formatTextXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), result);
                System.out.println("---调用图灵机器人文本消息:"+result);
            }
        } else if ("voice".endsWith(xmlEntity.getMsgType())) {
            //接受语音消息
            String recognition = xmlEntity.getRecognition();
            if (recognition.contains(SCHOOL_FEE)) {
                //回复图文消息
                result = new FormatXmlProcess().formatImageTextXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), PIC_URL, URL);
                System.out.println("---接受语音消息交学费:"+result);
            }else{
                result = new TulingApiProcess().getTulingResult(recognition);
                result = new FormatXmlProcess().formatTextXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), result);
                System.out.println("---只能语音回复:"+result);
            }
        } else {
            //其他类型的消息格式
        }
        return result;
    }

}
