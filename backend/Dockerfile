# syntax=docker/dockerfile:1
FROM python:3.11-slim-buster
ENV PYTHONUNBUFFERED=1
ENV PIP_ROOT_USER_ACTION=ignore

WORKDIR /backend
COPY requirements.txt /backend/

RUN apt-get update \
    && apt-get install -y build-essential netcat libpq-dev postgresql-client --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN pip install -U pip --no-cache-dir
RUN pip install -r requirements.txt --no-cache-dir

COPY . /backend/
