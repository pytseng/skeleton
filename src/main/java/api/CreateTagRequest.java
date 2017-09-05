package api;

import org.hibernate.validator.constraints.NotEmpty;

public class CreateTagRequest {
    @NotEmpty
    public Integer receipt_id;
}