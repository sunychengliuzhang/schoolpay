package com.ai.school.util;


import org.json.JSONObject;

import java.io.IOException;

public class WechatProcess {
    private static final String SCHOOL_FEE = "学费";
    private static final String PIC_URL = "http://cdn.sinacloud.net/image-001/%E5%BC%80%E5%AD%A6%E5%95%A6.jpg?KID=sina,19ibknuxtSIouwijakMo&Expires=1473505864&ssig=vnBW8sAAE0";
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
            if(content.contains(SCHOOL_FEE)){
                //文本消息包含缴费
                result = new FormatXmlProcess().formatImageTextXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), PIC_URL, URL);

            }else {
                //接收到的是文本消息,调用图灵机器人模块进行处理
                result = tulingResult(xmlEntity);
            }
        } else if ("voice".endsWith(xmlEntity.getMsgType())) {
            //接受语音消息
            String recognition = xmlEntity.getRecognition();
            if (recognition.contains(SCHOOL_FEE)) {
                //回复图文消息
                result = new FormatXmlProcess().formatImageTextXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), PIC_URL, URL);
            }else{
                //接收到的是文本消息,调用图灵机器人模块进行处理
                xmlEntity.setContent(recognition);
                result = tulingResult(xmlEntity);
            }
        } else {
            //其他类型的消息格式  目前仅支持语音和文本类型的数据
        }
        return result;
    }

    private String tulingResult(ReceiveXmlEntity xmlEntity) throws IOException {
        String result = "";
        JSONObject tulingResult = new TulingApiProcess().getTulingResult(xmlEntity.getContent());
        String code = tulingResult.get("code").toString();
        if("100000".equals(code)){
            //文本类消息
            result = new FormatXmlProcess().formatTextXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), tulingResult.get("text").toString());

        }else if("200000".equals(code)){
            //图片类消息 url相关类信息
            String text = tulingResult.get("text").toString();
            String url = tulingResult.get("url").toString();
            result = new FormatXmlProcess().formatTextXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), text+":  "+url);

        }else if("302000".equals(code)){
            //新闻类消息

        }else if("313000".equals(code)){
            //歌曲


        }else if("314000".equals(code)){
            //背诵诗歌
        }
        return result;
    }
    public String tulingResultStr(String originStr)throws IOException{
        JSONObject tulingResult = new TulingApiProcess().getTulingResult(originStr);
        String code = tulingResult.get("code").toString();
        String result = "";
        if("100000".equals(code)){
            //文本类消息
            return  tulingResult.get("text").toString();
        }
        return result;

    }

}
