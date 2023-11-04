from django.core.management.base import BaseCommand
from django.db import connection


class Command(BaseCommand):
    help = "Counts the number of tables in the public schema."

    def handle(self, *args, **kwargs):
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';"
            )
            count = cursor.fetchone()[0]

        self.stdout.write(str(count))
