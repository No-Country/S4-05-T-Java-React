package com.proyecto.palomo.dto.auth;

import lombok.Data;

import java.util.Date;

@Data
public class NoticeResponse {

    private String message;
    private Date timestamp;

    public NoticeResponse(Date timestamp, String message) {
        this.timestamp = timestamp;
        this.message = message;
    }
}
