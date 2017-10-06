package api;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;

/**
 * Represents the result of an OCR parse
 */
public class ReceiptSuggestionResponse {
    @JsonProperty
    public final String merchantName;

    @JsonProperty
    public final String amount;


    public ReceiptSuggestionResponse(String merchantName, String amount) {
        this.merchantName = merchantName;
        this.amount = amount;
    }
}
