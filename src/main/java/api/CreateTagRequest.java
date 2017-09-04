package api;

import org.hibernate.validator.constraints.NotEmpty;

import java.math.BigDecimal;


public class CreateTagRequest {
    @NotEmpty
    public Integer receipt_id;
}