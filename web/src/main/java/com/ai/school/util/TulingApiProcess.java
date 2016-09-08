package com.ai.school.util;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 调用图灵机器人api接口，获取智能回复内容
 *
 * @author pamchen-1
 */
public class TulingApiProcess {
    private static final String APIkey = "cce4d7508ea77b9f1024e3ef27dcf8b2";
    private static final String URL = "http://www.tuling123.com/openapi/api";

    /**
     * 调用图灵机器人api接口，获取智能回复内容，解析获取自己所需结果
     *
     * @param content 发送请求
     * @return
     */
    public String getTulingResult(String content) throws IOException {
        /** 此处为图灵api接口，采用httpPost请求进行 */
        HttpPost post = new HttpPost(URL);
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("key", APIkey));
        params.add(new BasicNameValuePair("info", content));
        post.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));
        HttpResponse response = new DefaultHttpClient().execute(post);
        String result = null;
        if (response.getStatusLine().getStatusCode() == 200) {//如果状态码为200,就是正常返回
            result = EntityUtils.toString(response.getEntity());
            org.json.JSONObject jsonObject = new org.json.JSONObject(result);
            Object code = jsonObject.get("code").toString();
            if ("100000".equals(code)) {
                result = jsonObject.get("text").toString();
            }
        }
        return result;

    }


}