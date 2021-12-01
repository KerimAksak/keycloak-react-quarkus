package org.kerim;

import io.quarkus.security.identity.SecurityIdentity;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/hello")
public class GreetingResource {

    @Inject
    SecurityIdentity identity;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @RolesAllowed("USER")
    public String hello() {
        System.out.println("user name..: "+identity.getPrincipal().getName());
        return "Hello from backend API (bearer only)" ;
    }

    @GET
    @Path("/public")
    @Produces(MediaType.TEXT_PLAIN)
    public String publicApi() {
        System.out.println("user name..: "+identity.getPrincipal().getName());
        return "<PUBLIC API> Hello from backend API (bearer only)";
    }

}