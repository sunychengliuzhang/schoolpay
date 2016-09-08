package com.ai.school.pay;


import com.alibaba.fastjson.JSONObject;

import java.io.Serializable;

public class ResponseHeader  implements Serializable {

    private static final long serialVersionUID = 1L;
    
    public static final String OPERATION_STATUS_SUCCEED = "0000";
    public static final String OPERATION_STATUS_FAILED = "0001";
    
    private String resultCode;//返回结果
    
    private String resultMessage;//返回信息
    
    private String detail;//返回详细
    
    private Integer pageNo = 1;// 请求查询的页码

	private Integer pageSize=1;// 每页显示条数

    /**
	 * 获取开始行
	 * 
	 * @return
	 * @author shanxf
	 */
	public int getStartRowIndex() {
		return (this.getPageNo() - 1) * this.getPageSize() + 1;
	}

	/**
	 * 获取结束行
	 * 
	 * @return
	 * @author shanxf
	 */
	public int getEndRowIndex() {
		return this.getPageNo() * this.getPageSize();
	}
	
	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	
	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}
    
    public ResponseHeader(){
        
    }
    
    public ResponseHeader(String resultCode,String resultMessage){
        this.resultCode = resultCode;
        this.resultMessage = resultMessage;
    }
    
    
    public ResponseHeader(String resultCode,String resultMessage,String detail){
        this.resultCode = resultCode;
        this.resultMessage = resultMessage;
        this.detail =  detail;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public String getResultMessage() {
        return resultMessage;
    }

    public void setResultMessage(String resultMessage) {
        this.resultMessage = resultMessage;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    } 
    
    public String toString() {
    	return JSONObject.toJSONString(this);
    }
}