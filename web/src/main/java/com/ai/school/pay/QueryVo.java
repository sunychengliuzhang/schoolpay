package com.ai.school.pay;

import java.util.Date;

public class QueryVo {
	//请求头
    private String serviceType; //服务类型
    private String clientIp;//客户端IP地址
    private String partnerId;//合作方标识
    private String partnerVerifyCode;//合作方身份校验码
    private Date requestTime;//请求时间
    
    //请求体
    private String partnerTradeNo;//合作方交易流水号
    private Date queryTime;//查询时间
    private String queryRemark="";//查询备注
    
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public String getClientIp() {
		return clientIp;
	}
	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}
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
	public String getPartnerTradeNo() {
		return partnerTradeNo;
	}
	public void setPartnerTradeNo(String partnerTradeNo) {
		this.partnerTradeNo = partnerTradeNo;
	}
	public Date getQueryTime() {
		return queryTime;
	}
	public void setQueryTime(Date queryTime) {
		this.queryTime = queryTime;
	}
	public String getQueryRemark() {
		return queryRemark;
	}
	public void setQueryRemark(String queryRemark) {
		this.queryRemark = queryRemark;
	}
}
