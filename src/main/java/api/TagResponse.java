package api;

import com.fasterxml.jackson.annotation.JsonProperty;
import generated.tables.records.TagsRecord;

import java.sql.Time;

public class TagResponse {
    @JsonProperty
    Integer id;

    @JsonProperty
    String tag_name;

    @JsonProperty
    Integer receipt_id;

    @JsonProperty
    Time created;

    public TagResponse(TagsRecord dbRecord) {
        this.tag_name = dbRecord.getTagName();
        this.receipt_id = dbRecord.getReceiptId();
        this.created = dbRecord.getUploaded();
        this.id = dbRecord.getId();
    }
}