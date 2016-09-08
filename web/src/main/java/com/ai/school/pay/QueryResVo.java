package com.ai.school.pay;

import java.util.Date;

public class QueryResVo {
	//响应头
    private String partnerId="";//合作方标识
    private String signedMsg;//签名信息
    
    //响应体
    private String partnerTradeNo;//合作方交易流水号
    private Date queryTime;//查询时间
    private String retCode;//响应码
    private String retMsg;//响应信息
    private String queryRemark="";//查询备注
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
	
	public String getRetCode() {
		return retCode;
	}
	public void setRetCode(String retCode) {
		this.retCode = retCode;
	}
	public String getRetMsg() {
		return retMsg;
	}
	public void setRetMsg(String retMsg) {
		this.retMsg = retMsg;
	}
	public String getQueryRemark() {
		return queryRemark;
	}
	public void setQueryRemark(String queryRemark) {
		this.queryRemark = queryRemark;
	}
}
