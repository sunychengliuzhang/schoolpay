package com.ai.school.action;

import com.ai.school.util.SignUtil;
import com.ai.school.util.WechatProcess;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Created by chengzheng on 16/9/8.
 *
 * 语音消息传递
 */
@Controller
public class WxChatAction {

    @RequestMapping(value = "wxSignature", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public void wxSignature(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String signature = request.getParameter("signature");
        String timestamp = request.getParameter("timestamp");
        String nonce = request.getParameter("nonce");
        String echostr = request.getParameter("echostr");
        PrintWriter out = response.getWriter();
        if (SignUtil.checkSignature(signature, timestamp, nonce)) {
            out.print(echostr);
        }
        out.close();
        out = null;
    }
    @RequestMapping(value = "dealCusMsg", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String dealCusMsg(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String textMsg = request.getParameter("textMsg");
        JSONObject jsonObject = new JSONObject();
        String result = new WechatProcess().tulingResultStr(textMsg);
        jsonObject.put("textResult",result);
        return jsonObject.toString();
    }

    @RequestMapping(value = "dealWxMsg",produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public void dealMsg(HttpServletRequest request,HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");

        /** 读取接收到的xml消息 */
        StringBuffer sb = new StringBuffer();
        InputStream is = request.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "UTF-8");
        BufferedReader br = new BufferedReader(isr);
        String s = "";
        while ((s = br.readLine()) != null) {
            sb.append(s);
        }
        String xml = sb.toString();	//次即为接收到微信端发送过来的xml数据

        String result = "";
        /** 判断是否是微信接入激活验证，只有首次接入验证时才会收到echostr参数，此时需要把它直接返回 */
        String echostr = request.getParameter("echostr");
        if (echostr != null && echostr.length() > 1) {
            result = echostr;
        } else {
            //正常的微信处理流程
            result = new WechatProcess().processWechatMag(xml);
        }

        try {
            OutputStream os = response.getOutputStream();
            os.write(result.getBytes("UTF-8"));
            os.flush();
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }




}
