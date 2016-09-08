package com.ai.school.pay;

public class SignPayDetailVo {
    //明细
    private String partnerTradeNo="";//合作方交易流水号
    private long payAmount;//付款金额
    private String payeePartnerAcctId="";//收款方账户标识
    private String payeePartnerAcctName="";//收款方账户名称
    private String payeeCardType="";//收款方卡类型
    private String payeeCardNo="";//收款方卡号
    private String payeeBankCode="";//收款方银行卡归属银行编码
    private String payeeCardName="";//收款方开户名
    private String payeeCertType="";//收款方证件类型
    private String payeeCertCode="";//收款方证件号码
    private String tradeReservedField1="";//交易明细预留字段1
    private String tradeReservedField2="";//交易明细预留字段2
    private String tradeReservedField3="";//交易明细预留字段3
    private String tradeReservedField4="";//交易明细预留字段4
    private String tradeReservedField5="";//交易明细预留字段5
    private String detailRemark="";//备注
    
	public String getPartnerTradeNo() {
		return partnerTradeNo;
	}
	public void setPartnerTradeNo(String partnerTradeNo) {
		this.partnerTradeNo = partnerTradeNo;
	}
	public long getPayAmount() {
		return payAmount;
	}
	public void setPayAmount(long payAmount) {
		this.payAmount = payAmount;
	}
	public String getPayeePartnerAcctId() {
		return payeePartnerAcctId;
	}
	public void setPayeePartnerAcctId(String payeePartnerAcctId) {
		this.payeePartnerAcctId = payeePartnerAcctId;
	}
	public String getPayeePartnerAcctName() {
		return payeePartnerAcctName;
	}
	public void setPayeePartnerAcctName(String payeePartnerAcctName) {
		this.payeePartnerAcctName = payeePartnerAcctName;
	}
	public String getPayeeCardType() {
		return payeeCardType;
	}
	public void setPayeeCardType(String payeeCardType) {
		this.payeeCardType = payeeCardType;
	}
	public String getPayeeCardNo() {
		return payeeCardNo;
	}
	public void setPayeeCardNo(String payeeCardNo) {
		this.payeeCardNo = payeeCardNo;
	}
	public String getPayeeBankCode() {
		return payeeBankCode;
	}
	public void setPayeeBankCode(String payeeBankCode) {
		this.payeeBankCode = payeeBankCode;
	}
	public String getPayeeCardName() {
		return payeeCardName;
	}
	public void setPayeeCardName(String payeeCardName) {
		this.payeeCardName = payeeCardName;
	}
	public String getPayeeCertType() {
		return payeeCertType;
	}
	public void setPayeeCertType(String payeeCertType) {
		this.payeeCertType = payeeCertType;
	}
	public String getPayeeCertCode() {
		return payeeCertCode;
	}
	public void setPayeeCertCode(String payeeCertCode) {
		this.payeeCertCode = payeeCertCode;
	}
	public String getTradeReservedField1() {
		return tradeReservedField1;
	}
	public void setTradeReservedField1(String tradeReservedField1) {
		this.tradeReservedField1 = tradeReservedField1;
	}
	public String getTradeReservedField2() {
		return tradeReservedField2;
	}
	public void setTradeReservedField2(String tradeReservedField2) {
		this.tradeReservedField2 = tradeReservedField2;
	}
	public String getTradeReservedField3() {
		return tradeReservedField3;
	}
	public void setTradeReservedField3(String tradeReservedField3) {
		this.tradeReservedField3 = tradeReservedField3;
	}
	public String getTradeReservedField4() {
		return tradeReservedField4;
	}
	public void setTradeReservedField4(String tradeReservedField4) {
		this.tradeReservedField4 = tradeReservedField4;
	}
	public String getTradeReservedField5() {
		return tradeReservedField5;
	}
	public void setTradeReservedField5(String tradeReservedField5) {
		this.tradeReservedField5 = tradeReservedField5;
	}
	public String getDetailRemark() {
		return detailRemark;
	}
	public void setDetailRemark(String detailRemark) {
		this.detailRemark = detailRemark;
	}
}
