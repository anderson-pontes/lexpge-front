import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/nav-link";
import { ArrowLeft } from 'lucide-react';

interface AtoCard {
    id: number;
    numero: string;
    titulo: string;
    ementa: string;
    tipo_id: string;
    fonte: string;
    situacao: string;
    data_ato: string;
    data_publicacao: string;
    observacao: string;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function Ficha() {
    const location = useLocation<{ ato?: AtoCard }>();
    const { id } = useParams<{ id: string }>();

    const [ato, setAto] = useState<AtoCard>({ 
        id: 0, numero: '', titulo: '', ementa: '', tipo_id: '', fonte: '', situacao: '', data_ato: '', data_publicacao: '', observacao: ''
    });

    useEffect(() => {
        async function loadAto() {
            if (location.state && location.state.ato) {
                setAto(location.state.ato);
            } else {
                const response = await fetch(import.meta.env.VITE_API_URL + `/atos/${id}`);
                const data = await response.json();
                setAto(data);
            }
        }
        loadAto();
    }, [id, location.state]);

    return (
        <>
            <Helmet title="Ficha" />
            <div className="space-y-6 p-4">
                <NavLink to="/atos">
                    <Button variant={'ghost'}>
                        <ArrowLeft />
                        Voltar
                    </Button>
                </NavLink>
                <h1 className="text-3xl font-bold tracking-tight text-center">{ato.titulo}</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
                        <span className="text-muted-foreground font-semibold w-32">Número:</span>
                        <span className="flex-1">{ato.numero}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
                        <span className="text-muted-foreground font-semibold w-32">Ementa:</span>
                        <span className="flex-1">{ato.ementa}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
                        <span className="text-muted-foreground font-semibold w-32">Tipo:</span>
                        <span className="flex-1">{ato.tipo_id}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
                        <span className="text-muted-foreground font-semibold w-32">Fonte:</span>
                        <span className="flex-1">{ato.fonte}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
                        <span className="text-muted-foreground font-semibold w-32">Situação:</span>
                        <span className="flex-1">{ato.situacao}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
                        <span className="text-muted-foreground font-semibold w-32">Data do ato:</span>
                        <span className="flex-1">{formatDate(ato.data_ato)}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
                        <span className="text-muted-foreground font-semibold w-32">Data da publicação:</span>
                        <span className="flex-1">{formatDate(ato.data_publicacao)}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 p-2 border-b">
                        <span className="text-muted-foreground font-semibold w-32">Observação:</span>
                        <div className="flex-1" dangerouslySetInnerHTML={{ __html: ato.observacao }} />
                    </div>
                </div>
            </div>
        </>
    );
}
