import createTag from '@actions/tag/create';
import deleteTag from '@actions/tag/delete';
import TagForm from '@components/form/tag/tag-form';
import { getAll } from '@services/tag';
import Stack from '@mui/material/Stack';
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';
import { Role } from "@constants/role";
import { redirect } from "next/navigation";
import { Container } from '@mui/material';

export default async function Page({ params }: { params: { id: number } }) {
    const tags = await getAll();
    const session = await getServerSession(authOptions);

    if (session?.user.role !== Role.ADMIN) {
        redirect("/");
    }
    
    return (
        <Container maxWidth="md">
            <h1>Liste des Tags</h1>
            <TagForm action={createTag} />
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                {tags.map((tag, index) => (
                    <TagForm key={index} action={deleteTag} tag={tag} />
                ))}
            </Stack>
        </Container>
    );
};

