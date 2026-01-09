import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import ComponentRenderer from './ComponentRenderer';

// 递归扫描 components 目录
async function getComponents(dir = '', rootDir = '') {
    const componentsDir = rootDir || path.join(process.cwd(), 'components');
    const fullPath = path.join(componentsDir, dir);

    let entries = [];
    try {
        entries = await fs.readdir(fullPath, { withFileTypes: true });
    } catch (err) {
        return [];
    }

    const components = [];

    for (const entry of entries) {
        const relativePath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const subComponents = await getComponents(relativePath, componentsDir);
            components.push(...subComponents);
        } else if (entry.isFile() && /\.(jsx|js|tsx|ts)$/.test(entry.name)) {
            // 移除扩展名作为 slug
            const slug = relativePath.replace(/\.(jsx|js|tsx|ts)$/, '').split(path.sep);
            components.push({
                name: entry.name,
                slug: slug,
                path: relativePath
            });
        }
    }

    return components;
}

export default async function Page(props) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const slug = params?.slug;

    if (!slug) {
        // 列表视图
        const components = await getComponents();

        // 按目录分组
        const grouped = components.reduce((acc, component) => {
            const dir = component.slug.slice(0, -1).join('/');
            if (!acc[dir]) acc[dir] = [];
            acc[dir].push(component);
            return acc;
        }, {});

        return (
            <div className="container py-5" style={{ paddingTop: '100px' }}>
                <h1>组件浏览器</h1>
                <p>选择一个组件来单独查看它。</p>

                {Object.keys(grouped).sort().map(dir => (
                    <div key={dir} className="mb-4">
                        <h3 className="text-capitalize border-bottom pb-2 mb-3">{dir || '根目录'}</h3>
                        <div className="row">
                            {grouped[dir].map(component => (
                                <div key={component.path} className="col-md-4 mb-2">
                                    <Link
                                        href={`/debug/components/${component.slug.join('/')}`}
                                        className="d-block p-2 bg-light text-decoration-none text-dark border rounded hover-shadow"
                                    >
                                        {component.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // 组件视图
    const componentPath = slug.join('/');

    // 从查询字符串解析 props
    const propsQuery = searchParams?.props;
    let componentProps = {};
    if (propsQuery) {
        try {
            componentProps = JSON.parse(propsQuery);
        } catch (e) {
            console.error("Failed to parse props", e);
        }
    }

    return <ComponentRenderer
        componentPath={componentPath}
        componentProps={componentProps}
        slug={slug}
    />;
}
