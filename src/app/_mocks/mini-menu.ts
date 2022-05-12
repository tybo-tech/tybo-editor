export const ROW_MINI_MENU: MiniMenu[] = [
    { Name: `<i class="fas fa-copy"></i> Copy row`, Action: 'copy-row' },
    { Name: `<i class="fas fa-copy"></i> Copy styles`, Action: 'copy-row-styles' },
    { Name: `<i class="fas fa-copy"></i> Paste styles`, Action: 'paste-row-styles' },
    { Name: `<i class="fas fa-arrow-up"></i> Position up`, Action: 'position-up' },
    { Name: `<i class="fas fa-arrow-down"></i> Position down`, Action: 'position-down' },
    { Name: `<i class="fas fa-trash"></i> Delete row`, Action: 'delete-row' }
]


export const COl_MINI_MENU: MiniMenu[] = [
    { Name: `<i class="fas fa-plus"></i> Add column`, Action: 'add-column' },
    { Name: `<i class="fas fa-copy"></i> Duplicate column`, Action: 'duplicate-column' },
    { Name: `<i class="fas fa-clipboard"></i> Paste element`, Action: 'paste-element' },
    { Name: `<i class="fas fa-copy"></i> Copy column`, Action: 'copy-column' },
    { Name: `<i class="fas fa-trash"></i> Delete column`, Action: 'delete-column' }
    // { Name: ``, Action: 'xxxxxx' },
]

export const ELEMENT_MINI_MENU: MiniMenu[] = [
    { Name: `<i class="fas fa-copy"></i> Copy styles`, Action: 'copy-styles' },
    { Name: `<i class="fas fa-copy"></i> Copy element`, Action: 'copy-element' },
    { Name: `<i class="fas fa-copy"></i> Change image`, Action: 'select-image' },
    { Name: `<i class="fas fa-trash"></i> Delete`, Action: 'delete' },
    { Name: `<i class="fas fa-clipboard"></i> Paste styles`, Action: 'paste-styles' }
    // { Name: ``, Action: 'xxxxxx' },
]

/**
 





      <li class="nav-item" *ngIf="type === 'image'">
        <a class="nav-link active" aria-current="page" (click)="selectMenu('select-image')"><i
            class="fas fa-copy"></i>Change image</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" (click)="selectMenu('delete')"><i
            class="fas fa-trash"></i>Delete</a>
      </li>
      <li class="nav-item" *ngIf="stylesToPaste">
        <a class="nav-link active" aria-current="page" (click)="selectMenu('paste-styles')"><i
            class="fas fa-clipboard"></i>Paste styles</a>
      </li>

 */




export const INPUT_MINI_MENU: MiniMenu[] = [
    { Name: `<i class="fas fa-copy"></i>Copy styles`, Action: `copy-styles` },
    { Name: `<i class="fas fa-clipboard"></i> Paste styles`, Action: 'paste-styles' },
    { Name: `<i class="fas fa-trash"></i> Delete column`, Action: 'delete-input' }
    // { Name: ``, Action: 'xxxxxx' },
]


export const FORMS_MINI_MENU: MiniMenu[] = [
    { Name: `<i class="fas fa-copy"></i> Copy styles`, Action: `copy-styles` },
    { Name: `<i class="fas fa-clipboard"></i> Paste styles`, Action: 'paste-styles' },
    { Name: `<i class="fas fa-trash"></i> Delete form`, Action: 'delete' }
    // { Name: ``, Action: 'xxxxxx' },
]
export const MENU_MINI_MENU: MiniMenu[] = [
    { Name: `<i class="fas fa-copy"></i> Copy styles`, Action: `copy-styles` },
    { Name: `<i class="fas fa-clipboard"></i> Paste styles`, Action: 'paste-styles' },
    { Name: `<i class="fas fa-trash"></i> Delete menu`, Action: 'delete' }
    // { Name: ``, Action: 'xxxxxx' },
]



export const SECTION_MINI_MENU: MiniMenu[] = [
    { Name: `<i class="fas fa-copy"></i>Copy section styles`, Action: `copy-section-styles` },
    {
        Name: `<i class="fas fa-copy"></i>Copy section content`, Action: `copy-section-content`
    },
    {
        Name: `<i
    class="fas fa-copy"></i>Duplicate section`, Action: `duplicate-section`
    },
    { Name: `<i class="fas fa-arrow-up"></i> Position to top`, Action: 'top' },
    { Name: `<i class="fas fa-arrow-up"></i> Position up`, Action: 'position-up' },
    { Name: `<i class="fas fa-arrow-down"></i> Position down`, Action: 'position-down' },
    {
        Name: `<i class="fas fa-clipboard"></i> Paste column `, Action: `paste-column`
    },
    {
        Name: `<i  class="fas fa-clipboard"></i>Paste section styles`, Action: `paste-section-styles`
    },
    {
        Name: `<i  class="fas fa-clipboard"></i>Paste section content`, Action: `paste-section-content`
    },
    {
        Name: `<i class="fas fa-trash"></i>Delete section`, Action: `delete-section`
    }
]

export const SAMPLE_MENU: MiniMenu[] = [
    { Name: `mmmmm`, Action: `nnnnn` },
]

export interface MiniMenu {
    Name: string;
    Action: string;
}


