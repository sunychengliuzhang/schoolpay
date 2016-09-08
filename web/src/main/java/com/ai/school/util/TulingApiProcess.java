package com.ai.school.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

/**
 * 调用图灵机器人api接口，获取智能回复内容
 * @author pamchen-1
 *
 */
public class TulingApiProcess {
	private static final String APIkey = "cce4d7508ea77b9f1024e3ef27dcf8b2";
	private static final String URL = "http://www.tuling123.com/openapi/api?KEY=";
	/**
	 * 调用图灵机器人api接口，获取智能回复内容，解析获取自己所需结果
	 * @param content
	 * @return
	 */
	public String getTulingResult(String content){
		/** 此处为图灵api接口，采用httpPost请求进行 */
		String result = "暂时返回空白内容,后期需要调用图灵机器人访问";
		return result;
	}
}