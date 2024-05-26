package test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import stry.STRYBeApplication;
import stry.api.UserController;
import stry.exceptions.UserAlreadyExistsException;
import stry.model.Korisnik;
import stry.service.UserService;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = STRYBeApplication.class)
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testLoginSuccess() throws Exception {
        when(userService.checkCredentials(any(String.class), any(String.class))).thenReturn("success");
        when(userService.findByUsername(any(String.class)))
                .thenReturn(Optional.of(new Korisnik("korisnik", "korisnik", "test@example.com", "Test", "User")));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/allUsers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"korisnik\", \"password\": \"korisnik\"}"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testAddNewUser_Success() {
        Korisnik newUser = new Korisnik("testuser", "password", "test@example.com", "Test", "User");
        when(userRepository.save(any())).thenReturn(newUser);

        Korisnik addedUser = userService.addNewUser(newUser);

        assertNotNull(addedUser);
        assertEquals("testuser", addedUser.getUsername());
    }

    @Test
    public void testAddNewPlayerSuccess() throws Exception {
        when(userService.addNewUser(any(Korisnik.class)))
                .thenReturn(new Korisnik("test", "password", "test@example.com", "Test", "User"));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/addNewPlayer")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"test\", \"password\": \"password\", \"email\": \"test@example.com\", \"firstName\": \"Test\", \"lastName\": \"User\"}"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}

