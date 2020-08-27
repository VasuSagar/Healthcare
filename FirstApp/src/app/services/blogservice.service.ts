import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class BlogserviceService {
  options;
  url:string='/api';

  constructor(private authService: AuthService,
    private http: Http) { }


    createAuthenticationHeaders() {
      this.authService.loadTokenDoctor(); // Get token so it can be attached to headers
      // Headers configuration options
      this.options = new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json', // Format set to JSON
          'Authorization': this.authService.authToken // Attach token
        })
      });
    }
    // Function to create a new blog post
    newBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.url+'/users/newBlog', blog, this.options).map(res => res.json());
  }

  // Function to get all blogs from the database
  getAllBlogs() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.url+'/users/allBlogs', this.options).map(res => res.json());
  }

  // Function to get the blog using the id
  getSingleBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.url+'/users/singleBlog/'+ id, this.options).map(res => res.json());
  }

  // Function to edit/update blog post
  editBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.url+'/users/updateBlog/', blog, this.options).map(res => res.json());
  }

   // Function to delete a blog
   deleteBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.url+'/users/deleteBlog/'+ id, this.options).map(res => res.json());
  }


  // Function to like a blog post
  likeBlog(id) {
    //const blogData = { id: id,uname:"doc2"};
    
    return this.http.put(this.url+'/users/likeBlog/', id, this.options).map(res => res.json());
  }

  // Function to dislike a blog post
  dislikeBlog(id) {
    //const blogData = { id: id };
    return this.http.put(this.url+'/users/dislikeBlog/', id, this.options).map(res => res.json());
  }

  // Function to post a comment on a blog post
  postComment(data) {
    
    this.createAuthenticationHeaders(); // Create headers
 
    return this.http.post(this.url+'/users/comment/', data, this.options).map(res => res.json());

  }



}
