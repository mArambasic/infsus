package stry.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "Input does not match requested data format")
public class NotEnoughParametersException extends RuntimeException {
    public NotEnoughParametersException(String t) {
        super(t);
    }
}
