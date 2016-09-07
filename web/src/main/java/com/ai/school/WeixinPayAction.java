package com.ai.school;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by chengzheng on 16/9/7.
 */
@Controller
public class WeixinPayAction {

    @RequestMapping(value = "weixinpay")
    @ResponseBody
    public String weixinPay(HttpServletRequest request){
        return "weixin";
    }
}
