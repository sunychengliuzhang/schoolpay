package com.ai.school.pay;

public class SignPayResDetailVo {
	
    //明细
    private String tradeNo;//支付平台交易流水号
    private String partnerTradeNo="";//合作方交易流水号
    private String resultCode;//合作方返回结果
    private long amount;//支付金额
    private String detailRemark;//明细备注
    private String acctReservedField1="";//账户预留字段1
    private String acctReservedField2="";//账户预留字段2
    private String acctReservedField3="";//账户预留字段3
	
	public String getTradeNo() {
		return tradeNo;
	}
	public void setTradeNo(String tradeNo) {
		this.tradeNo = tradeNo;
	}
	public String getPartnerTradeNo() {
		return partnerTradeNo;
	}
	public void setPartnerTradeNo(String partnerTradeNo) {
		this.partnerTradeNo = partnerTradeNo;
	}
	public String getResultCode() {
		return resultCode;
	}
	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}
	public long getAmount() {
		return amount;
	}
	public void setAmount(long amount) {
		this.amount = amount;
	}
	public String getDetailRemark() {
		return detailRemark;
	}
	public void setDetailRemark(String detailRemark) {
		this.detailRemark = detailRemark;
	}
	public String getAcctReservedField1() {
		return acctReservedField1;
	}
	public void setAcctReservedField1(String acctReservedField1) {
		this.acctReservedField1 = acctReservedField1;
	}
	public String getAcctReservedField2() {
		return acctReservedField2;
	}
	public void setAcctReservedField2(String acctReservedField2) {
		this.acctReservedField2 = acctReservedField2;
	}
	public String getAcctReservedField3() {
		return acctReservedField3;
	}
	public void setAcctReservedField3(String acctReservedField3) {
		this.acctReservedField3 = acctReservedField3;
	}
}
