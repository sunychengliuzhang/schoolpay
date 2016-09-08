package com.ai.school.action;

import com.ai.school.util.SignUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by chengzheng on 16/9/8.
 */
@Controller
public class MachineChatAction {

    private static final String APIkey = "cce4d7508ea77b9f1024e3ef27dcf8b2";
    private static final String URL = "http://www.tuling123.com/openapi/api";

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



}
