// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Quantize.java

package workspace.action;

import framework.trace.Trace;
import java.awt.Image;
import java.awt.image.PixelGrabber;
import java.io.IOException;
import java.io.PrintStream;

public class Quantize
{
    static class Cube
    {
        static class Node
        {

            void pruneChild()
            {
                parent.nchild--;
                parent.unique += unique;
                parent.total_red += total_red;
                parent.total_green += total_green;
                parent.total_blue += total_blue;
                parent.child[id] = null;
                cube.nodes--;
                cube = null;
                parent = null;
            }

            void pruneLevel()
            {
                if(nchild != 0)
                {
                    for(int id = 0; id < 8; id++)
                        if(child[id] != null)
                            child[id].pruneLevel();

                }
                if(level == cube.depth)
                    pruneChild();
            }

            int reduce(int threshold, int next_threshold)
            {
                if(nchild != 0)
                {
                    for(int id = 0; id < 8; id++)
                        if(child[id] != null)
                            next_threshold = child[id].reduce(threshold, next_threshold);

                }
                if(number_pixels <= threshold)
                {
                    pruneChild();
                } else
                {
                    if(unique != 0)
                        cube.colors++;
                    if(number_pixels < next_threshold)
                        next_threshold = number_pixels;
                }
                return next_threshold;
            }

            void colormap()
            {
                if(nchild != 0)
                {
                    for(int id = 0; id < 8; id++)
                        if(child[id] != null)
                            child[id].colormap();

                }
                if(unique != 0)
                {
                    int r = (total_red + (unique >> 1)) / unique;
                    int g = (total_green + (unique >> 1)) / unique;
                    int b = (total_blue + (unique >> 1)) / unique;
                    cube.colormap[cube.colors] = 0xff000000 | (r & 0xff) << 16 | (g & 0xff) << 8 | (b & 0xff) << 0;
                    color_number = cube.colors++;
                }
            }

            void closestColor(int red, int green, int blue, Search search)
            {
                if(nchild != 0)
                {
                    for(int id = 0; id < 8; id++)
                        if(child[id] != null)
                            child[id].closestColor(red, green, blue, search);

                }
                if(unique != 0)
                {
                    int color = cube.colormap[color_number];
                    int distance = distance(color, red, green, blue);
                    if(distance < search.distance)
                    {
                        search.distance = distance;
                        search.color_number = color_number;
                    }
                }
            }

            static final int distance(int color, int r, int g, int b)
            {
                return Quantize.SQUARES[((color >> 16 & 0xff) - r) + 255] + Quantize.SQUARES[((color >> 8 & 0xff) - g) + 255] + Quantize.SQUARES[((color >> 0 & 0xff) - b) + 255];
            }

            public String toString()
            {
                StringBuffer buf = new StringBuffer();
                if(parent == this)
                    buf.append("root");
                else
                    buf.append("node");
                buf.append(' ');
                buf.append(level);
                buf.append(" [");
                buf.append(mid_red);
                buf.append(',');
                buf.append(mid_green);
                buf.append(',');
                buf.append(mid_blue);
                buf.append(']');
                return new String(buf);
            }

            Cube cube;
            Node parent;
            Node child[];
            int nchild;
            int id;
            int level;
            int mid_red;
            int mid_green;
            int mid_blue;
            int number_pixels;
            int unique;
            int total_red;
            int total_green;
            int total_blue;
            int color_number;

            Node(Cube cube)
            {
                this.cube = cube;
                parent = this;
                child = new Node[8];
                id = 0;
                level = 0;
                number_pixels = 0x7fffffff;
                mid_red = 128;
                mid_green = 128;
                mid_blue = 128;
            }

            Node(Node parent, int id, int level)
            {
                cube = parent.cube;
                this.parent = parent;
                child = new Node[8];
                this.id = id;
                this.level = level;
                cube.nodes++;
                if(level == cube.depth)
                    cube.colors++;
                parent.nchild++;
                parent.child[id] = this;
                int bi = (1 << 8 - level) >> 1;
                mid_red = parent.mid_red + ((id & 1) <= 0 ? -bi : bi);
                mid_green = parent.mid_green + ((id & 2) <= 0 ? -bi : bi);
                mid_blue = parent.mid_blue + ((id & 4) <= 0 ? -bi : bi);
            }
        }

        static class Search
        {

            int distance;
            int color_number;

            Search()
            {
            }
        }


        void classification()
        {
            int pixels[][] = this.pixels;
            int width = pixels.length;
            int height = pixels[0].length;
            for(int x = width; x-- > 0;)
            {
                for(int y = height; y-- > 0;)
                {
                    int pixel = pixels[x][y];
                    int red = pixel >> 16 & 0xff;
                    int green = pixel >> 8 & 0xff;
                    int blue = pixel >> 0 & 0xff;
                    if(nodes > 0x41241)
                    {
                        System.out.println("pruning");
                        root.pruneLevel();
                        depth--;
                    }
                    Node node = root;
                    for(int level = 1; level <= depth; level++)
                    {
                        int id = (red <= node.mid_red ? 0 : 1) << 0 | (green <= node.mid_green ? 0 : 1) << 1 | (blue <= node.mid_blue ? 0 : 1) << 2;
                        if(node.child[id] == null)
                            new Node(node, id, level);
                        node = node.child[id];
                        node.number_pixels += Quantize.SHIFT[level];
                    }

                    node.unique++;
                    node.total_red += red;
                    node.total_green += green;
                    node.total_blue += blue;
                }

            }

        }

        void reduction()
        {
            for(int threshold = 1; colors > max_colors; threshold = root.reduce(threshold, 0x7fffffff))
                colors = 0;

        }

        void assignment()
        {
            colormap = new int[colors];
            colors = 0;
            root.colormap();
            int pixels[][] = this.pixels;
            int width = pixels.length;
            int height = pixels[0].length;
            Search search = new Search();
            for(int x = width; x-- > 0;)
            {
                for(int y = height; y-- > 0;)
                {
                    int pixel = pixels[x][y];
                    int red = pixel >> 16 & 0xff;
                    int green = pixel >> 8 & 0xff;
                    int blue = pixel >> 0 & 0xff;
                    Node node = root;
                    do
                    {
                        int id = (red <= node.mid_red ? 0 : 1) << 0 | (green <= node.mid_green ? 0 : 1) << 1 | (blue <= node.mid_blue ? 0 : 1) << 2;
                        if(node.child[id] == null)
                            break;
                        node = node.child[id];
                    } while(true);
                    pixels[x][y] = node.color_number;
                }

            }

        }

        int pixels[][];
        int max_colors;
        int colormap[];
        Node root;
        int depth;
        int colors;
        int nodes;

        Cube(int pixels[][], int max_colors)
        {
            this.pixels = pixels;
            this.max_colors = max_colors;
            int i = max_colors;
            for(depth = 1; i != 0; depth++)
                i /= 4;

            if(depth > 1)
                depth--;
            if(depth > 8)
                depth = 8;
            else
            if(depth < 2)
                depth = 2;
            root = new Node(this);
        }
    }


    public Quantize()
    {
    }

    public static int[][] getPixels(Image image)
        throws IOException
    {
        int w = image.getWidth(null);
        int h = image.getHeight(null);
        int pix[] = new int[w * h];
        PixelGrabber grabber = new PixelGrabber(image, 0, 0, w, h, pix, 0, w);
        try
        {
            if(!grabber.grabPixels())
                throw new IOException((new StringBuilder("grabber returned false: ")).append(grabber.status()).toString());
        }
        catch(InterruptedException e)
        {
            Trace.ERROR(e, e);
        }
        int pixels[][] = new int[w][h];
        for(int x = w; x-- > 0;)
        {
            for(int y = h; y-- > 0;)
                pixels[x][y] = pix[y * w + x];

        }

        return pixels;
    }

    public static int[] quantizeImage(Image image, int max_colors)
    {
        int pixels[][] = new int[1][1];
        try
        {
            pixels = getPixels(image);
        }
        catch(IOException ex)
        {
            Trace.ERROR(ex, ex);
        }
        return quantizeImage(pixels, max_colors);
    }

    public static int[] quantizeImage(int pixels[][], int max_colors)
    {
        Cube cube = new Cube(pixels, max_colors);
        cube.classification();
        cube.reduction();
        cube.assignment();
        return cube.colormap;
    }

    static final boolean QUICK = true;
    static final int MAX_RGB = 255;
    static final int MAX_NODES = 0x41241;
    static final int MAX_TREE_DEPTH = 8;
    static int SQUARES[];
    static int SHIFT[];

    static 
    {
        SQUARES = new int[511];
        for(int i = -255; i <= 255; i++)
            SQUARES[i + 255] = i * i;

        SHIFT = new int[9];
        for(int i = 0; i < 9; i++)
            SHIFT[i] = 1 << 15 - i;

    }
}
