import createTag from '@actions/tag/create';
import TagForm from '@components/form/tag-form';
import { getAll } from '@services/tag';
import Stack from '@mui/material/Stack';


export default async function Page({ params }: { params: { id: number } }) {
    const tags = await getAll();
    console.log(tags);
    return (
        <div>
            <h1>Liste des Tags</h1>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">

                {tags.map((tag, key) => (
                    <p key={key}>
                        {tag.name}

                    </p>
                ))}
            </Stack>

            <TagForm action={createTag} />
        </div>
    );
};

