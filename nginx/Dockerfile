# Base image
FROM ubuntu:jammy

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Bangkok

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libpcre3-dev \
    libssl-dev \
    zlib1g-dev \
    git \
    gcc \
    make \
    tzdata \
    software-properties-common

# Add ffmpeg 7.0 repository and install ffmpeg
RUN add-apt-repository ppa:ubuntuhandbook1/ffmpeg7 -y \
&& apt-get update \
&& apt-get install -y ffmpeg

# Download nginx source
RUN curl -L https://nginx.org/download/nginx-1.25.4.tar.gz | tar -xz

# Clone nginx-http-flv-module
RUN git clone https://github.com/winshining/nginx-http-flv-module.git
   
RUN mkdir -p /var/www/html/stream/hls \
    && mkdir -p /var/www/html && cp /nginx-http-flv-module/stat.xsl /var/www/html

# Build nginx with module
WORKDIR /nginx-1.25.4
RUN ./configure \
    --with-http_auth_request_module \
    --add-module=../nginx-http-flv-module \
    && make \
    && make install

# Set working directory
WORKDIR /usr/local/nginx

# Clean up unnecessary files
RUN apt-get clean \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/* \
    && rm -rf /nginx-1.25.4 \
    && rm -rf /nginx-http-flv-module \
    && rm -rf /ngx_brotli \
    && rm -rf /openssl-3.0

# Expose ports for HTTP HTTPS and RTMP
EXPOSE 80 443 1935

# Default command
CMD ["/usr/local/nginx/sbin/nginx", "-g", "daemon off;"]