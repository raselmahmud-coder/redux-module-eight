import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
  tagTypes: ["Videos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["Videos"],
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
    }),
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");
        const queryString = tags.map((tag) => `title_like=${tag}`).join("&");
        return `/videos?${queryString}&_limit=4&_sort=views&_order=desc&id_ne=${id}`;
      },
    }),
    addVideo: builder.mutation({
      query: (body) => ({
        url: "/videos",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});
export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
} = apiSlice;
