import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BlogserviceService} from '../../../services/blogservice.service';
@Component({
  selector: 'app-delblog',
  templateUrl: './delblog.component.html',
  styleUrls: ['./delblog.component.css']
})
export class DelblogComponent implements OnInit {
  message;
  messageClass;
  foundBlog = false;
  processing = false;
  blog;
  currentUrl;
  constructor(
    private blogService: BlogserviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve blog
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        // Create the blog object to use in HTML
        this.blog = {
          title: data.blog.title, // Set title
          body: data.blog.body, // Set body
          createdBy: data.blog.createdBy, // Set created_by field
          createdAt: data.blog.createdAt // Set created_at field
        }
        this.foundBlog = true; // Displaly blog window
      }
    });
  }
  


  // Function to delete blogs
  deleteBlog() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.blogService.deleteBlog(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to blog page
        setTimeout(() => {
          this.router.navigate(['/blog']); // Route users to blog page
        }, 2000);
      }
    });
  }
}
