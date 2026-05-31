import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(
  req: Request,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },

        {
          status: 401,
        },
      );
    }

    const { id: taskId } = await params;

    const formData = await req.formData();

    const note = String(formData.get("note") || "").trim();

    const file = formData.get("file") as File | null;

    /*
      chống submit rỗng
    */

    if (!note && !file) {
      return NextResponse.json(
        {
          error: "Nothing to submit",
        },

        {
          status: 400,
        },
      );
    }

    const task = await prisma.tblTask.findUnique({
      where: {
        id: taskId,
      },

      select: {
        id: true,

        status: true,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          error: "Task not found",
        },

        {
          status: 404,
        },
      );
    }

    let uploadedUrl: string | null = null;

    let fileName: string | null = null;

    if (file) {
      fileName = file.name;

      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploaded = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "tasks",

              resource_type: "auto",

              use_filename: true,

              unique_filename: false,
            },

            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });

      fileName = file.name;

      uploadedUrl = cloudinary.url(uploaded.public_id, {
        resource_type: uploaded.resource_type,

        flags: "attachment",

        attachment: file.name,

        secure: true,
      });
      
      uploadedUrl = uploaded.secure_url;
    }

    const updatedTask = await prisma.tblTask.update({
      where: {
        id: taskId,
      },

      data: {
        status: "DONE",

        submittedAt: new Date(),

        resultNote: note || null,

        resultUrl: uploadedUrl || null,

        resultFileName: fileName || null,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("[TASK_SUBMIT_ERROR]", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },

      {
        status: 500,
      },
    );
  }
}
