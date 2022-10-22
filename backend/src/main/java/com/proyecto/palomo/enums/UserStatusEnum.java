package com.proyecto.palomo.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserStatusEnum {
    AVAILABLE(1, "Disponible"),
    BUSY(2, "Ocupado"),
    ABSENT(3, "Ausente"),
    DISCONNECTED(4, "Desconectado");

    private final long id;
    private final String name;
}
