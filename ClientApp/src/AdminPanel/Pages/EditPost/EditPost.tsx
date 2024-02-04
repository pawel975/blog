// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Layout from "../../Layout/Layout";
// import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import useApiData from "../../../hooks/useApiData";
// import { getBlogPost } from "../../../data/services/BlogPostService";
// import { BlogPost } from "../../../data/model/BlogPostModel";

// interface ErrorsObject {
//   Title: string[];
//   ShortDescription: string[];
//   PrimaryImageSrc: string[];
//   BlogPostContent: string[];
// }

// // TODO: Copied from Create Post page, check if it's right to update
// const EditPost: React.FC = () => {
//   const navigate = useNavigate();
//   const { postId } = useParams();
//   // Get value of edit post
//   const { data, loading, error } = useApiData<BlogPost>(() => getBlogPost(postId!), [postId]);

//   const [title, setTitle] = useState<string | undefined>("");
//   const [shortDescription, setShortDescription] = useState<string | undefined>("");
//   const [primaryImageSrc, setPrimaryImageSrc] = useState<string>("");
//   const [blogPostContent, setBlogPostContent] = useState<string>("");

//   const [errors, setErrors] = useState<ErrorsObject>({
//     Title: [],
//     ShortDescription: [],
//     PrimaryImageSrc: [],
//     BlogPostContent: [],
//   });

//   // Change it so it doesnt run on every typed letter in form
//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     const formData: {
//       title: string;
//       shortDescription: string;
//       primaryImageSrc: string;
//       blogPostContent: string;
//     } = {
//       title: title || "",
//       shortDescription: shortDescription || "",
//       primaryImageSrc: primaryImageSrc || "",
//       blogPostContent: blogPostContent || "",
//     };

//     setErrors({
//       Title: [],
//       ShortDescription: [],
//       PrimaryImageSrc: [],
//       BlogPostContent: [],
//     });

//     axios
//       .put(`/api/blogPosts/${postId}`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log("Post edited successfully");
//         navigate("/admin-panel/posts");
//       })
//       .catch((error) => {
//         const errorCategory = error.response.data.errors;

//         // TODO: Create helper function based on this code
//         // Check if there are any errors from API that are not handled
//         Object.keys(errorCategory).forEach((category) => {
//           if (!Object.keys(errors).includes(category)) {
//             console.error(`Not handled category of error from API, error category - ${category}`);
//           }
//         });

//         setErrors({
//           ...errors,
//           Title: errorCategory.Title || [],
//           ShortDescription: errorCategory.ShortDescription || [],
//           PrimaryImageSrc: errorCategory.PrimaryImageSrc || [],
//           BlogPostContent: errorCategory.BlogPostContent || [],
//         });
//         console.error("Failed to edit post:", error);
//       });
//   };

//   // TODO: Refactor this
//   useEffect(() => {
//     if (!loading && !error) {
//       for (const key in data) {
//         switch (key) {
//           case "title":
//             setTitle(data[key]);
//             break;
//           case "shortDescription":
//             setShortDescription(data[key]);
//             break;
//           case "primaryImageSrc":
//             setPrimaryImageSrc(data[key]);
//             break;
//           case "blogPostContent":
//             setBlogPostContent(data[key]);
//             break;
//           default:
//             if (key !== "id") console.error(`No action for key of '${key}'`);
//             break;
//         }
//       }
//     }
//   }, [data, loading, error]);

//   return (
//     <Layout header="Edit Post">
//       <Form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label for="title">Title</Label>
//           <Input
//             invalid={Boolean(errors["Title"].length > 0)}
//             id="title"
//             type="text"
//             name="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           {errors["Title"].map((errorMsg, index) => (
//             <FormFeedback key={index}>{errorMsg}</FormFeedback>
//           ))}
//         </FormGroup>

//         <FormGroup>
//           <Label for="shortDescription">Short Description</Label>
//           <Input
//             invalid={Boolean(errors["ShortDescription"].length > 0)}
//             type="text"
//             id="shortDescription"
//             name="shortDescription"
//             value={shortDescription}
//             onChange={(e) => setShortDescription(e.target.value)}
//           />
//           {errors["ShortDescription"].map((errorMsg, index) => (
//             <FormFeedback key={index}>{errorMsg}</FormFeedback>
//           ))}
//         </FormGroup>

//         <FormGroup>
//           <Label for="primaryImageSrc">Primary Image Source</Label>
//           <Input
//             invalid={Boolean(errors["PrimaryImageSrc"].length > 0)}
//             id="primaryImageSrc"
//             type="text"
//             name="primaryImageSrc"
//             value={primaryImageSrc}
//             onChange={(e) => setPrimaryImageSrc(e.target.value)}
//           />
//           {errors["PrimaryImageSrc"].map((errorMsg, index) => (
//             <FormFeedback key={index}>{errorMsg}</FormFeedback>
//           ))}
//         </FormGroup>

//         <FormGroup>
//           <Label for="blogPostContent">Blog post content</Label>
//           <Input
//             invalid={Boolean(errors["BlogPostContent"].length > 0)}
//             id="blogPostContent"
//             type="textarea"
//             name="blogPostContent"
//             value={blogPostContent}
//             onChange={(e) => setBlogPostContent(e.target.value)}
//           />
//           {errors["BlogPostContent"].map((errorMsg, index) => (
//             <FormFeedback key={index}>{errorMsg}</FormFeedback>
//           ))}
//         </FormGroup>
//         <Button color="primary">Edit</Button>
//       </Form>
//     </Layout>
//   );
// };

// export default EditPost;
