declare namespace Databases {
  interface Info {
    database_id: string;
    database_url: string;
    database_title: string;
  }

  interface Response {
    num_of_databases: number;
    selected_database_id: string;
    databases: Database[];
  }
}
