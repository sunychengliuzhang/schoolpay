package com.ai.school.pay;

import java.util.List;

public class SignPayResVo {
	//请求头
    private String partnerId="";//合作方标识
    private String signedMsg;//签名信息
    
    private List<SignPayResDetailVo> detail;
    
	public String getPartnerId() {
		return partnerId;
	}
	public void setPartnerId(String partnerId) {
		this.partnerId = partnerId;
	}
	public String getSignedMsg() {
		return signedMsg;
	}
	public void setSignedMsg(String signedMsg) {
		this.signedMsg = signedMsg;
	}
	public List<SignPayResDetailVo> getDetail() {
		return detail;
	}
	public void setDetail(List<SignPayResDetailVo> detail) {
		this.detail = detail;
	}
}
