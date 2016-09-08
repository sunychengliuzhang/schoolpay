package com.ai.school.util;


import java.io.IOException;

public class WechatProcess {
    private static final String SCHOOL_FEE = "学费";
    private static final String PIC_URL = "";
    private static final String URL = "";
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
            //接收到的是文本消息,调用图灵机器人模块进行处理
            result = new TulingApiProcess().getTulingResult(xmlEntity.getContent());
            result = new FormatXmlProcess().formatTextXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), result);

        } else if ("voice".endsWith(xmlEntity.getMsgType())) {
            //接受语音消息
            String recognition = xmlEntity.getRecognition();
            System.out.println("-------语音识别结果:" + recognition);

            if (recognition.contains(SCHOOL_FEE)) {
                //回复图文消息
                result = new FormatXmlProcess().formatImageTextXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), PIC_URL, URL);
                System.out.println("发送图文消息---------"+result);
            }

        } else {
            //其他类型的消息格式

        }


        return result;
    }

}
