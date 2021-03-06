package com.ai.vo;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by chengzheng on 16/9/7.
 */
public class StudentFeeMsg {

    private Integer amount;

    private String feeRemark;
    
    private String stuNo;
    
    private String schoolName;

    public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public String getStuNo() {
		return stuNo;
	}

	public void setStuNo(String stuNo) {
		this.stuNo = stuNo;
	}

	public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getFeeRemark() {
        return feeRemark;
    }

    public void setFeeRemark(String feeRemark) {
        this.feeRemark = feeRemark;
    }

    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }
}
