# PROJECT_DOC.md - Generador de Propuestas TECHNOULTRA

## Visión del producto
Una plataforma web híbrida que combina un CMS interno "Zero Trust" protegido con contraseñas/cookies y un frontend premium ultra-rápido para la presentación comercial a clientes corporativos.

## Alcance Inicial
- Editor simple `admin/proposals/new` para crear nuevas propuestas con defaults.
- Visualizador en `proposal/[slug]` de alto impacto visual con animaciones de Framer Motion.
- Capacidad para crear layouts desacoplados para Ecommerce, Web, App y Marketing.

## Arquitectura general
- **Framework**: Next.js (App Router).
- **Estilos**: Tailwind CSS.
- **Base de Datos**: Supabase (PostgreSQL).
- **Animaciones**: Framer Motion.
- **Seguridad**: Reglas Zero Trust por Middleware. Validaciones exclusivas en backend.

## Reglas de Seguridad implementadas (Zero Trust)
- `middleware.ts` enruta todo tráfico a `/admin` y valida presencia del token en cookies.
- Las mutaciones van hacia API endpoints que internamente usan llaves o lógica segura.
- Los slugs no son iterables (generación UUID truncado), impidiendo data scraping.

## Contratos API v1
- **POST** `/api/proposals`: Recibe `{ client_name, company, service_type, price, timeline, ...customs }`. Retorna un objeto propuesta insertado y su `slug`. Genera slug seguro usando `crypto.randomUUID()`.

## Decisiones clave tomadas
- Se adoptaron datos por defecto (defaults) en `src/config/defaultContent.ts` que pueden ser sobreescritos por JSONs en Supabase si el usuario inserta algo a medida (Híbrido).
- Animaciones complejas se incluyeron solo del lado cliente (`'use client'`) envolviendo en sub-componentes (Hero, About, Timeline...) para evitar pérdida de SEO o performance de hidratación del SSR de Next.js.
