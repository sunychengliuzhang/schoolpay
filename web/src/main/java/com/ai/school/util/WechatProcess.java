package com.ai.school.util;

import java.io.IOException;

public class WechatProcess {
	/**
	 * 解析处理xml、获取智能回复结果（通过图灵机器人api接口）
	 * @param xml 接收到的微信数据
	 * @return	最终的解析结果（xml格式数据）
	 */
	public String processWechatMag(String xml) throws IOException {
		/** 解析xml数据 */
		ReceiveXmlEntity xmlEntity = new ReceiveXmlProcess().getMsgEntity(xml);
		

		String result = "";
		if("text".endsWith(xmlEntity.getMsgType())){
			//接收到的是文本消息,调用图灵机器人模块进行处理
			System.out.println("----接受到文本消息->"+xmlEntity.getContent());
			result = new TulingApiProcess().getTulingResult(xmlEntity.getContent());
		}else if("voice".endsWith(xmlEntity.getMsgType())){
			System.out.println("----------->"+xmlEntity.toString());
			//语音消息  自行处理
//			<xml>
//			<ToUserName><![CDATA[toUser]]></ToUserName>
//			<FromUserName><![CDATA[fromUser]]></FromUserName>
//			<CreateTime>1357290913</CreateTime>
//			<MsgType><![CDATA[voice]]></MsgType>
//			<MediaId><![CDATA[media_id]]></MediaId>
//			<Format><![CDATA[Format]]></Format>
//			<Recognition><![CDATA[腾讯微信团队]]></Recognition>
//			<MsgId>1234567890123456</MsgId>
//			</xml>
		}else if("image".endsWith(xmlEntity.getMsgType())){
			//图片处理
		}
		
		/** 此时，如果用户输入的是“你好”，在经过上面的过程之后，result为“你也好”类似的内容 
		 *  因为最终回复给微信的也是xml格式的数据，所有需要将其封装为文本类型返回消息
		 * */
		result = new FormatXmlProcess().formatXmlAnswer(xmlEntity.getFromUserName(), xmlEntity.getToUserName(), result);
		
		return result;
	}
}
