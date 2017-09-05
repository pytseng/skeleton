package controllers;

import api.ReceiptResponse;
import dao.TagDao;
import generated.tables.records.ReceiptsRecord;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Path("")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TagController {
    final TagDao tags;

    public TagController(TagDao tags) {
        this.tags = tags;
    }

    @PUT
    @Path("/tags/{tag}")
    public void toggleTag(Integer rID, @PathParam("tag") String tagName) {
        tags.insert(rID, tagName);
    }

    @GET
    @Path("/tags/{tag}")
    public List<ReceiptResponse> getReceiptsFromTag (@PathParam("tag") String tagName) {
        List<ReceiptsRecord> receiptRecords = tags.getReceiptsFromTag(tagName);
        return receiptRecords.stream().map(ReceiptResponse::new).collect(toList());
    }

    @GET
    @Path("/netid")
    @Produces(MediaType.TEXT_PLAIN)
    public String returnNetID () {
        return "pt382";
    }
}