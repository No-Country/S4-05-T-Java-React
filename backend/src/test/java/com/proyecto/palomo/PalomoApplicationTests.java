package com.proyecto.palomo;

import com.proyecto.palomo.enums.UserStatusEnum;
import com.proyecto.palomo.model.UserStatus;
import com.proyecto.palomo.repository.IUserStatusRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

@SpringBootTest
class PalomoApplicationTests {

	@Autowired
	private IUserStatusRepository repository;

	@Test
	void contextLoads() {
		Arrays.stream(UserStatusEnum.values())
				.forEach(status -> repository.save(new UserStatus(status)));
	}

}
