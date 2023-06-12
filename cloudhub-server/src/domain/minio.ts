import * as Minio from "minio";

export const minioClient = new Minio.Client({
	accessKey: process.env.MINIO_ACCESS_KEY,
	secretKey: process.env.MINIO_SECRET_KEY,
	endPoint: "172.17.0.2",
	port: 9000,
	useSSL: false,
});
