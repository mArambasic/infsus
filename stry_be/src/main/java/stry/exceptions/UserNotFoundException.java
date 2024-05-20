package stry.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "User does not exist")
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String t) {
        super(t);
    }
}
