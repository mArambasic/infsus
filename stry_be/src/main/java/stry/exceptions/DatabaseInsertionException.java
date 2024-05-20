package stry.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "Submitted data could not be stored in database")
public class DatabaseInsertionException extends RuntimeException {
    public DatabaseInsertionException(String t) {
        super(t);
    }
}
