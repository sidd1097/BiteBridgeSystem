package com.example.foodbooking.security;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.foodbooking.service.RedisService;

import io.jsonwebtoken.Claims;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtils utils;

	@Autowired
	private RedisService redisService;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");

		if (authHeader != null && authHeader.startsWith("Bearer ")) {

			String jwt = authHeader.substring(7);

			if (!redisService.isTokenBlacklisted(jwt)) {

				Claims payloadClaims = utils.validateJwtToken(jwt);

				String email = utils.getUserNameFromJwtToken(payloadClaims);

				List<GrantedAuthority> authorities = utils.getAuthoritiesFromClaims(payloadClaims);

				CustomUserDetails userDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(email);

				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails, null,
						authorities);

				SecurityContextHolder.getContext().setAuthentication(token);
				System.out.println("saved auth token in sec ctx");
			}
		}
		filterChain.doFilter(request, response);

	}

}
