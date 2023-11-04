#!/bin/sh

# Start server
echo "Waiting for database to be ready..."
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database to be ready..."
  sleep 1
done
echo "Database is up and running"

echo "Installing dependencies"
pip install -U pip
pip install -r requirements.txt | grep -v 'already satisfied'

echo "Collecting Static Files"
python manage.py collectstatic --no-input

Check if tables exist in the database
TABLE_COUNT=$(python manage.py count_tables)

echo "Run Migrations"
python manage.py migrate --no-input

Check if tables exist in the database
if [ "$TABLE_COUNT" -eq 0 ]; then
    echo "Loading Fixtures..."
    python manage.py loaddata fixtures.json.gz
fi

echo "Invalidating Cache"
python manage.py invalidate_cachalot

echo "Starting Server"
python manage.py runserver 0.0.0.0:8000
