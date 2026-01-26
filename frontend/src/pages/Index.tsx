import { Layout } from '@/components/layout';
import {
  Hero,
  About,
  Products,
  CustomSolutions,
  Benefits,
  Gallery,
  Testimonials,
  CTA,
} from '@/components/sections';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Products />
      <CustomSolutions />
      <Benefits />
      <Gallery />
      <Testimonials />
      <CTA />
    </Layout>
  );
};

export default Index;
