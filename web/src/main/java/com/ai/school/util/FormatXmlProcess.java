package com.ai.school.util;

import java.util.Date;

/**
 * 封装最终的xml格式结果
 *
 * @author pamchen-1
 */
public class FormatXmlProcess {
    /**
     * 封装文字类的返回消息
     *
     * @param to
     * @param from
     * @param content
     * @return
     */
    public String formatTextXmlAnswer(String to, String from, String content) {
        StringBuffer sb = new StringBuffer();
        Date date = new Date();
        sb.append("<xml><ToUserName><![CDATA[");
        sb.append(to);
        sb.append("]]></ToUserName><FromUserName><![CDATA[");
        sb.append(from);
        sb.append("]]></FromUserName><CreateTime>");
        sb.append(date.getTime());
        sb.append("</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[");
        sb.append(content);
        sb.append("]]></Content><FuncFlag>0</FuncFlag></xml>");
        return sb.toString();
    }

    public String formatImageTextXmlAnswer(String to, String from, String picurl, String url) {
        StringBuffer sb = new StringBuffer();
        Date date = new Date();
        sb.append("<xml><ToUserName><![CDATA[");
        sb.append(to);
        sb.append("]]></ToUserName><FromUserName><![CDATA[");
        sb.append(from);
        sb.append("]]></FromUserName><CreateTime>");
        sb.append(date.getTime());
        sb.append(
                "</CreateTime><MsgType><![CDATA[news]]>" +
                "</MsgType><ArticleCount>1</ArticleCount><Articles><item><Title>" +
                "<![CDATA[交学费]]></Title><Description><![CDATA[可以在网上交学费了啦!]]>" +
                "</Description><PicUrl><![CDATA[");
        sb.append(picurl);
        sb.append("]]></PicUrl><Url><![CDATA[" + url +
                "]]></Url></item></Articles></xml>");
        return sb.toString();
    }

    public String formatImageXmlAnswer(String to, String from, String picurl, String url) {
        StringBuffer sb = new StringBuffer();
        Date date = new Date();
        sb.append("<xml><ToUserName><![CDATA[");
        sb.append(to);
        sb.append("]]></ToUserName><FromUserName><![CDATA[");
        sb.append(from);
        sb.append("]]></FromUserName><CreateTime>");
        sb.append(date.getTime());
        sb.append(
                "</CreateTime><MsgType><![CDATA[news]]>" +
                        "</MsgType><ArticleCount>1</ArticleCount><Articles><item><Title>" +
                        "<![CDATA[交学费]]></Title><Description><![CDATA[可以在网上交学费了啦!]]>" +
                        "</Description><PicUrl><![CDATA[");
        sb.append(picurl);
        sb.append("]]></PicUrl><Url><![CDATA[" + url +
                "]]></Url></item></Articles></xml>");
        return sb.toString();
    }

}

