


export interface YFContract {

    icon: any;
    name: string;
    size: number;
    id: number;
    uid: string;
    mine_type: string;
    parent: number;
    path: string;
    parent_uid: string;
    kind: string;
    permissions: string;
    file_access?: string;
    copy_count: number;
    has_copy: number;
    is_dir: number;
    is_hosted: number; // as 0 or 1 for boolean
    is_inbin: number | boolean;
    is_starred: number;
    revision: string;
    user_id: number;
    drive: string;
    bytes: number;
    owner: string;
    updated_at: string;
    created_at: string;
    image: string;
    extension: string;
    file_url: any;
    file_content: any;
    format: any;
    isSelected?: boolean;
    links: any[];
    count: number;
    data?: any[]; // set to any as we get it from yegobox api
    prev_name?: string;
    custom_name?: string;
    folder_id?: number;
    mouse_event?: string;
    last_page_url?: string;
    next_page_url?: string;
}
