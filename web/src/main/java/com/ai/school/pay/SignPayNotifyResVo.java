package com.ai.school.pay;

import java.util.Date;
import java.util.List;

public class SignPayNotifyResVo {
	//请求头
    private String partnerId="";//合作方标识
    private String partnerVerifyCode="";//合作方身份校验码
    private Date requestTime;//请求时间
    
    private List<SignPayNotifyResDetailVo> detail;
    
	public String getPartnerId() {
		return partnerId;
	}
	public void setPartnerId(String partnerId) {
		this.partnerId = partnerId;
	}
	public String getPartnerVerifyCode() {
		return partnerVerifyCode;
	}
	public void setPartnerVerifyCode(String partnerVerifyCode) {
		this.partnerVerifyCode = partnerVerifyCode;
	}
	public Date getRequestTime() {
		return requestTime;
	}
	public void setRequestTime(Date requestTime) {
		this.requestTime = requestTime;
	}
	public List<SignPayNotifyResDetailVo> getDetail() {
		return detail;
	}
	public void setDetail(List<SignPayNotifyResDetailVo> detail) {
		this.detail = detail;
	}
}
