package com.proyecto.palomo.mapper;

import com.proyecto.palomo.dto.userstatus.UserStatusRequest;
import com.proyecto.palomo.dto.userstatus.UserStatusResponse;
import com.proyecto.palomo.model.UserStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserStatusMapper {
    @Mapping(target = "id", source = "userStatusId")
    UserStatusResponse toResponse(UserStatus entity);

    List<UserStatusResponse> toResponses(List<UserStatus> entities);

    @Mapping(target = "userStatusId", ignore = true)
    @Mapping(target= "users", ignore = true)
    UserStatus toEntity(UserStatusRequest request);

}
